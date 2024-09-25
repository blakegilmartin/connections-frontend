import DefaultLayout from "@/layouts/default";
import { Card, CardBody } from "@nextui-org/card";
import axios from "axios";
import React, { useEffect } from "react";

export default function IndexPage() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    axios.get("http://localhost:3456/connection/latest").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <section className="flex items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex inline-block max-w-lg text-center justify-center">
          Blake's Connections
        </div>
      </section>
      <div className="grid grid-cols-4 gap-4">
        {data.map((word) => (
          <div key={word} className="flex items-center justify-center">
            <Card
              className="flex inline-block max-w-lg text-center justify-center"
              style={{ height: "5rem", width: "5rem" }}
              radius="lg"
              isPressable
              onPress={() => console.log("i was pressed")}
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
        ))}
      </div>
    </DefaultLayout>
  );
}
