import { PriceData } from "./Coin";
import { fetchCoinTickers } from "./api";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 10px;
  width: 300px;
  margin: auto;
`;

const PriceText = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};
  margin: 5px 0;
`;

const ChangeText = styled.p<{ change: number }>`
  font-size: 16px;
  color: ${(props) => (props.change > 0 ? "green" : "red")};
  margin: 5px 0;
`;

const MarketCapText = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const VolumeText = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

function Price() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
    refetchInterval: 5000,
  });

  return isLoading ? (
    "Loading..."
  ) : (
    <Container>
      <PriceText>Price: ${data?.quotes.USD.price}</PriceText>
      <ChangeText change={data?.quotes.USD.percent_change_24h || 0}>
        24h Change: {data?.quotes.USD.percent_change_24h}%
      </ChangeText>
      <MarketCapText>Market Cap: ${data?.quotes.USD.market_cap}</MarketCapText>
      <VolumeText>Volume: ${data?.quotes.USD.volume_24h}</VolumeText>
    </Container>
  );
}

export default Price;
