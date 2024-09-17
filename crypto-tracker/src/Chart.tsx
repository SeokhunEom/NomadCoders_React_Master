import ApexChart from "react-apexcharts";
import { IsDarkContext } from "./App";
import { fetchCoinHistoryTemp } from "./api";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface HistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const { isDark } = useContext(IsDarkContext);
  const { coinId } = useParams();

  const { isLoading, data } = useQuery<HistoricalData[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistoryTemp(coinId),
    refetchInterval: 10000,
  });
  const candlestickData = data?.map((price) => ({
    x: new Date(price.time_close),
    y: [price.open, price.high, price.low, price.close],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ data: candlestickData }]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
