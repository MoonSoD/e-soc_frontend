import React, { FC } from "react";
import { Calendar, StatsCard, TopNav, withLayout } from "@components";
import { Container } from "@styles";
import styled from "styled-components";
import {
  getReportsForNow,
  getStats,
  getVisitationList,
  ReportsForNow,
  Stats,
  Visitation,
} from "@services";
import { withAuth } from "@hocs/withAuth";

const Styled = {
  StatsGrid: styled.section`
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(1, 1fr);

    @media only screen and (min-width: 768px) {
      gap: 4.5rem;
      grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
  AlertGrid: styled.section`
    display: grid;
    gap: 4.5rem;
    grid-template-columns: repeat(1, 1fr);

    @media only screen and (min-width: 1024px) {
      gap: 4.5rem;
      grid-template-columns: repeat(2, 1fr);
    }
  `,
};

const Home = ({ stats, visits }: { stats: Stats; visits: Visitation[] }) => {
  return (
    <>
      <TopNav />
      <Container marginTop="2.1875rem">
        <Styled.StatsGrid>
          <StatsCard
            label="klientov"
            value={stats?.count?.clients}
            icon="user"
            accentColor="#418B48"
            color="#489B50"
          />
          <StatsCard
            label="plánovaných návštev"
            value={stats?.count?.plannedVisits}
            icon="group-alt"
            accentColor="#8B4141"
            color="#9B4848"
          />
          <StatsCard
            label="dostupných miest"
            value={stats?.count?.availablePlaces}
            icon="home-alt-check"
            accentColor="#415E8B"
            color="#48699B"
          />
        </Styled.StatsGrid>
        <Calendar visits={visits} />
      </Container>
    </>
  );
};

export default withLayout(Home as FC);

export const getServerSideProps = withAuth(async (context) => {
  const jwt = context.session.accessToken;
  const stats = await getStats(jwt);
  const visits = await getVisitationList(jwt);

  // const reports = await getReportsForNow(jwt);

  return {
    props: { stats, visits },
  };
});
