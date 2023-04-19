import { Box } from "@mui/system";
import { ReactElement } from "react";

type Params = {
  content: ReactElement
  value: number
  index: number
}

export default function TabPanel(props: Params) {
  const { content, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{content}</Box>}
    </div>
  );
}
