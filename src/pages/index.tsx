import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "@nextui-org/button";

import DefaultLayout from "@/layouts/default";

interface IConnectionData {
  connectionData: string[];
  correctAnswers: { category: string; answers: string[] }[];
  selectedConnections: string[];
  triesRemaining: number;
}

const correctAnsColor = [
  "bg-green-500",
  "bg-red-500",
  "bg-blue-500",
  "bg-orange-500",
];

export default function IndexPage() {
  const [connectionData, setConnectionData] = React.useState<IConnectionData>({
    connectionData: [],
    correctAnswers: [],
    selectedConnections: [],
    triesRemaining: 4,
  });

  const panelPress = (word: string, isPressable: boolean) => {
    if (!isPressable) return;
    if (!connectionData.selectedConnections.includes(word))
      setConnectionData({
        ...connectionData,
        selectedConnections: [...connectionData.selectedConnections, word],
      });
    else
      setConnectionData({
        ...connectionData,
        selectedConnections: connectionData.selectedConnections.filter(
          (value) => value !== word
        ),
      });
  };

  const submit = () => {
    if (connectionData.selectedConnections.length !== 4) return;

    let data = JSON.stringify({
      attemptString: connectionData.selectedConnections.join(),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:3456/connection/checkAttempt?id=${1}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data) {
          setConnectionData({
            ...connectionData,
            connectionData: connectionData.connectionData.filter(
              (word) => !connectionData.selectedConnections.includes(word)
            ),
            correctAnswers: connectionData.correctAnswers.concat([
              {
                category: response.data,
                answers: connectionData.selectedConnections,
              },
            ]),
            selectedConnections: [],
          });
        }
        // else lose a try
        else {
          setConnectionData({
            ...connectionData,
            triesRemaining: connectionData.triesRemaining - 1,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3456/connection/latest").then((res) => {
      setConnectionData({ ...connectionData, connectionData: res.data });
    });
  }, []);

  const isMaxSelected = connectionData.selectedConnections.length === 4;

  const circle = (
    <svg height="1.5rem" width="1.5rem">
      <circle cx=".75rem" cy=".75rem" fill="gray" r=".375rem" />
    </svg>
  );

  const rows = [];

  for (let i = 0; i < connectionData.triesRemaining; i++) {
    rows.push(<div key={i}>{circle}</div>);
  }

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex inline-block max-w-lg text-center justify-center">
          Blake&apos;s Connections
        </div>
      </section>
      {connectionData.correctAnswers.map((answer, index) => {
        return (
          <div
            key={JSON.stringify(answer)}
            className={`flex inline-block align-middle items-center justify-center text-xs ${correctAnsColor[index]} my-3 rounded-md`}
            style={{ height: "5rem" }}
          >
            <div className="flex-col inline-block align-middle text-center justify-center">
              <p className="font-bold text-sm">{answer.category}</p>
              <p>{answer.answers.join(", ")}</p>
            </div>{" "}
          </div>
        );
      })}
      <div className="grid grid-cols-4 gap-4">
        {connectionData.connectionData.map((word) => (
          <div key={word} className="flex items-center justify-center">
            <div
              key={word}
              className="flex inline-block max-w-lg text-center justify-center"
            >
              <Card
                className="flex inline-block max-w-lg text-center justify-center"
                isPressable={true}
                radius="lg"
                style={{
                  height: "5rem",
                  width: "5rem",
                  backgroundColor: connectionData.selectedConnections.includes(
                    word
                  )
                    ? "gray"
                    : "white",
                }}
                onPress={() =>
                  panelPress(
                    word,
                    !isMaxSelected ||
                      connectionData.selectedConnections.includes(word)
                  )
                }
              >
                <CardBody>
                  <div
                    className="text-center justify-center"
                    style={{ fontSize: ".7rem" }}
                  >
                    {word}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        ))}
      </div>
      <div className="flex inline-block max-w-lg text-center justify-center pt-5">
        <Button color="success" variant="solid" onClick={() => submit()}>
          Submit
        </Button>
        <div className="flex items-center justify-center mx-2">
          {
            <div className="flex inline-block text-center justify-center">
              {rows}
            </div>
          }
        </div>
      </div>
    </DefaultLayout>
  );
}
