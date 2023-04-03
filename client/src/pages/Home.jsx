import { motion as m , AnimatePresence} from "framer-motion"
import {useSnapshot} from "valtio"

import state from "../store"
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from "../config/motion"

const Home = () => {
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
        {
          snap.intro && (
             <m.section 
             className="home"
             {...slideAnimation('left')}
             >
                <m.header {...slideAnimation("down")}>
                    <img 
                      src="./threejs.png"
                      alt="logo"
                      className="w-8 h-8 object-contain"
                    />
                </m.header>
             </m.section>
          )
        }
    </AnimatePresence>
  )
}

export default Home