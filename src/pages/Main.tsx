import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabPanel from "../components/common/TabPanel";
import Repos from "../components/main/Repos";
import Users from "../components/main/Users";
import { a11yProps } from "../utils/formatter";

const Main = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        aria-label="basic tabs example"
      >
        <Tab label="Repositories" {...a11yProps(0)} />
        <Tab label="Users" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tab} index={0} content={<Repos />} />
      <TabPanel value={tab} index={1} content={<Users />} />
    </Box>
  );
};

export default Main;
