import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';

const useVRControls = (renderer, camera, scene) => {
    const [vrState, setVRState] = useState({
        isActive: false,
        controllers: []
    });

    // Initialize VR controllers
    const initControllers = useCallback(() => {
        if (!renderer || !scene) return;

        // Create controllers
        const controller1 = renderer.xr.getController(0);
        const controller2 = renderer.xr.getController(1);

        // Setup controller geometry
        const controllerGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -1)
        ]);

        const controllerMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            linewidth: 2
        });

        // Add visual representation to controllers
        controller1.add(new THREE.Line(controllerGeometry, controllerMaterial));
        controller2.add(new THREE.Line(controllerGeometry, controllerMaterial));

        scene.add(controller1);
        scene.add(controller2);

        setVRState(prev => ({
            ...prev,
            controllers: [controller1, controller2]
        }));

        return () => {
            scene.remove(controller1);
            scene.remove(controller2);
            controller1.remove();
            controller2.remove();
        };
    }, [renderer, scene]);

    // Handle VR session events
    const handleVRSessionStart = useCallback(() => {
        setVRState(prev => ({ ...prev, isActive: true }));
    }, []);

    const handleVRSessionEnd = useCallback(() => {
        setVRState(prev => ({ ...prev, isActive: false }));
    }, []);

    // Handle controller selection and interaction
    const handleSelect = useCallback((event) => {
        const controller = event.target;
        const raycaster = new THREE.Raycaster();
        const tempMatrix = new THREE.Matrix4();

        tempMatrix.identity().extractRotation(controller.matrixWorld);
        raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

        return raycaster.intersectObjects(scene.children, true);
    }, [scene]);

    // Track controller movements and interactions
    const updateControllers = useCallback(() => {
        vrState.controllers.forEach(controller => {
            if (controller.userData.isSelecting) {
                const intersections = handleSelect({ target: controller });
                if (intersections.length > 0) {
                    const intersection = intersections[0];
                    if (intersection.object.userData.type === 'hotspot') {
                        intersection.object.userData.onClick?.();
                    }
                }
            }
        });
    }, [vrState.controllers, handleSelect]);

    // Setup VR event listeners and cleanup
    useEffect(() => {
        if (!renderer) return;

        const cleanup = initControllers();
        
        renderer.xr.addEventListener('sessionstart', handleVRSessionStart);
        renderer.xr.addEventListener('sessionend', handleVRSessionEnd);

        vrState.controllers.forEach(controller => {
            const handleSelectStart = () => {
                controller.userData.isSelecting = true;
            };
            
            const handleSelectEnd = () => {
                controller.userData.isSelecting = false;
            };

            controller.addEventListener('select', handleSelectStart);
            controller.addEventListener('selectend', handleSelectEnd);

            return () => {
                controller.removeEventListener('select', handleSelectStart);
                controller.removeEventListener('selectend', handleSelectEnd);
            };
        });

        return () => {
            cleanup?.();
            renderer.xr.removeEventListener('sessionstart', handleVRSessionStart);
            renderer.xr.removeEventListener('sessionend', handleVRSessionEnd);
        };
    }, [renderer, initControllers, handleVRSessionStart, handleVRSessionEnd, vrState.controllers]);

    return {
        isVRActive: vrState.isActive,
        controllers: vrState.controllers,
        updateControllers
    };
};

export default useVRControls;