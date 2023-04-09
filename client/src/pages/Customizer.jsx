import React, {useState,useEffect} from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from "../config/config";
import state from '../store';
import { download } from "../assets";
import { downloadCanvasToImage,reader } from  "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes} from "../config/constants"
import { fadeAnimation, slideAnimation } from '../config/motion';
import { 
  AiPicker, 
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setactiveFilterTab] = useState({
    logoshirt : true,
    stylishShirt : false
  });
  //show tab content depending of the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
        break;
      case "filepicker":
        return <FilePicker
          file={File}
          setFile={setFile}
          readFile={readFile}
        />
        break;
      case "aipicker":
        return <AiPicker />
        break;  
      default:
        return null;
    }
  }

  const handleDecals = (type,result) => {
     const decalType = DecalTypes[type];
     state[decalType.stateProperty] = result;

     if(!activeFilterTab[decalType.filterTab]){
        handleActiveFilterTab(decalType.filterTab)
     }
  }

  const handleActiveFilterTab = (tabName) => {
     switch (tabName) {
      case "logoshirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
        case "stylishShirt":
          state.isFullTextture = !activeFilterTab[tabName];
          break;
      default:
        state.isLogoTexture = true;
        state.isFullTextture = false;
        break;
     }
  }

  const readFile = (type)=>{
    reader(file).then((result)=>{
      handleDecals(type,result);
      setActiveEditorTab("");
    })
  }
  return (
    <AnimatePresence>
        {
          !snap.intro && (
            <>
               <motion.div
                  key="custom"
                  className='absolute top-0 left-0 z-10'
                  {...slideAnimation("left")}
               >
                  <div className='flex items-center min-h-screen'>
                      <div className='editortabs-container tabs'>
                          {
                            EditorTabs.map((tab)=> (
                              <Tab
                                  key={tab.name}
                                  tab={tab}
                                  handleClick={()=> setActiveEditorTab(tab.name)}
                              />
                            ))
                          }

                          {generateTabContent()}
                      </div>
                  </div>
               </motion.div>
               
               <motion.div
                className='absolute z-10 top-5 right-5'
                {...fadeAnimation}
               >
                  <CustomButton
                    type="filled"
                    title='Go Back' 
                    handleClick={() => state.intro = true}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                  />
               </motion.div>

               <motion.div
                className='filtertabs-container'
                {...slideAnimation("up")}
               >
                    {
                      FilterTabs.map((tab)=> (
                        <Tab
                          key={tab.name}
                          tab={tab}
                          isFilterTab
                          isActiveTab=""
                          handleClick={()=>{}}
                          />
                      ))
                    }      
               </motion.div>
            </>
          )
        }
    </AnimatePresence>
  )
}

export default Customizer