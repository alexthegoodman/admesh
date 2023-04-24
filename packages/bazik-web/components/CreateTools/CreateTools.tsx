import * as React from "react";

import styles from "./CreateTools.module.scss";

import { CreateToolsProps } from "./CreateTools.d";
import { Button, View } from "@adobe/react-spectrum";
import Text from "@spectrum-icons/workflow/Text";
import Image from "@spectrum-icons/workflow/Image";
import Shapes from "@spectrum-icons/workflow/Shapes";
import CreateTool from "../CreateTool/CreateTool";
import { useCycle } from "framer-motion";

const CreateTools: React.FC<CreateToolsProps> = () => {
  const [openTool, setOpenTool] = React.useState<string | null>(null);
  const [tool1Open, cycleTool1Open] = useCycle(false, true);
  const [tool2Open, cycleTool2Open] = useCycle(false, true);
  const [tool3Open, cycleTool3Open] = useCycle(false, true);

  const handleToolNav = (tool: string) => {
    console.log("handleToolNav", openTool, tool);

    if (openTool === "text" && tool === "text") {
      // toggle, avoids calling cycleTool1Open twice
      cycleTool1Open();
      setOpenTool(null);
    } else {
      if (openTool === "text") {
        cycleTool1Open();
      }
      if (tool === "text") {
        cycleTool1Open();
        setOpenTool(tool);
      }
    }

    if (openTool === "photos" && tool === "photos") {
      cycleTool2Open();
      setOpenTool(null);
    } else {
      if (openTool === "photos") {
        cycleTool2Open();
      }
      if (tool === "photos") {
        cycleTool2Open();
        setOpenTool(tool);
      }
    }

    if (openTool === "shapes" && tool === "shapes") {
      cycleTool3Open();
      setOpenTool(null);
    } else {
      if (openTool === "shapes") {
        cycleTool3Open();
      }

      if (tool === "shapes") {
        cycleTool3Open();
        setOpenTool(tool);
      }
    }
  };

  return (
    <View>
      <div className={styles.createToolsInner}>
        <CreateTool
          icon={<Text />}
          value="text"
          label="Text"
          open={tool1Open}
          handleToolNav={handleToolNav}
          sidebarContent1={
            <>
              <Button variant="cta">Add text</Button>
            </>
          }
          sidebarContent2={<>Decorative Text Coming Soon</>}
        />

        <CreateTool
          icon={<Image />}
          value="photos"
          label="Photos"
          open={tool2Open}
          handleToolNav={handleToolNav}
          sidebarContent1={<>Photos 1</>}
          sidebarContent2={<>Content 2</>}
        />

        <CreateTool
          icon={<Shapes />}
          value="shapes"
          label="Shapes"
          open={tool3Open}
          handleToolNav={handleToolNav}
          sidebarContent1={<>Shapes 1</>}
          sidebarContent2={<>Content 2</>}
        />
      </div>
    </View>
  );
};

export default CreateTools;
