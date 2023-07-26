// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
// import peopleImage from "assets/img/people-image.png";
// import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
// Custom icons
// import {
//   CartIcon,
//   DocumentIcon,
//   GlobeIcon,
//   WalletIcon,
// } from "components/Icons/Icons.js";
import React from "react";
import { dashboardTableData, timelineData } from "../../variables/general";
import ActiveUsers from "./components/ActiveUsers.jsx";
// import BuiltByDevelopers from "./components/BuiltByDevelopers";
// import MiniStatistics from "./components/MiniStatistics";
// import OrdersOverview from "./components/OrdersOverview";
// import Projects from "./components/Projects.jsx";
import SalesOverview from "./components/SalesOverview.jsx";
// import WorkWithTheRockets from "./components/WorkWithTheRockets";

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
       <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        mb={{ lg: "26px" }}>
        <ActiveUsers
          title={"Active Users"}
          percentage={23}
          chart={<BarChart />}
        />
        <SalesOverview
          title={"Sales Overview"}
          percentage={5}
          chart={<LineChart />}
        />
      </Grid>
  </Flex>
  );
}
