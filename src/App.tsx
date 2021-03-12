import { useEffect, useState } from "react";
import { Button, Layout, Result, Spin, Typography } from "antd";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchObservations, Observation } from "./services/Observation";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [state, setState] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [data, setData] = useState<Observation[]>([]);

  const fetchData = async () => {
    try {
      setState("loading");
      const observations = await fetchObservations("GDPCA", {
        frequency: "a",
        observationStart: "1999-04-15",
        observationEnd: "2020-04-15",
      });
      setData(observations);
      setState("success");
    } catch (_) {
      setState("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderChart = () => {
    return (
      <Typography>
        <Title level={3}>Real Gross Domestic Product</Title>
        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <XAxis dataKey="date" />
              <YAxis dataKey="value" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Typography>
    );
  };

  const renderContent = () => {
    switch (state) {
      case "success":
        return renderChart();
      case "loading":
        return (
          <div className="spinner">
            <Spin />
          </div>
        );
      case "error":
      default:
        return (
          <div>
            <Result
              status="500"
              title="Oh no!"
              subTitle="Sorry, something went wrong."
              extra={
                <Button type="primary" onClick={fetchData}>
                  Try again
                </Button>
              }
            />
          </div>
        );
    }
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content className="content">{renderContent()}</Content>
    </Layout>
  );
}

export default App;
