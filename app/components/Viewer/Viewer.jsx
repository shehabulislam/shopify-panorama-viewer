import { useEffect, useRef, useState } from 'react'

export function Viewer(){
    const [viewer, setViewer] = useState(null)
    const viewerRef = useRef();
    

    useEffect(() => {
        if(viewerRef.current){
            const instance = window.pannellum.viewer('panorama', {
                type: "equirectangular",
                panorama: "https://pannellum.org/images/alma.jpg",
                autoLoad: true,
            });
            window.viewer = instance;
            setViewer(instance);
        }

        return () => {
            viewer?.destroy();
        }
    }, []);

    return <>
        <div id="panorama" style={{height: '500px'}}></div>
    </>
}