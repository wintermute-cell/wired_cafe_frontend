<script lang="ts">
    import * as PIXI from 'pixi.js';
    import { onMount } from 'svelte';
    import { createSprite } from './rendering';
    import { renderablesStore } from './stores';


    let canvas_container: any; // has to be any, else view cant be attached.
    onMount(() => {
        let papp = initPixi();
        let initial_width = papp.renderer.width;
        renderablesStore.subscribe(renderables => {
            for (const renderable of renderables) {
                const newSprite = <PIXI.AnimatedSprite>createSprite(renderable);
                if ( renderable.isAnimated ) { newSprite.play(); }
                newSprite.scale.x = 0.4;
                newSprite.scale.y = 0.4;
                papp.stage.addChild(newSprite);
            }
        });

        // resize the canvas itself, scale the contents accordingly
        // every time the window is resized.
        function debounceEvent(func){
            var timer;
            return function(event){
                if(timer) clearTimeout(timer);
                timer = setTimeout(func,100,event);
            };
        }
        window.addEventListener('resize', debounceEvent(function() {
            papp.renderer.resize(canvas_container.offsetWidth, canvas_container.offsetHeight);
            let scale = papp.renderer.width / initial_width;
            papp.stage.scale.set(scale);
        }));

    });

    function initPixi() {
        PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;
        const papp = new PIXI.Application({
            backgroundColor: 0x00aaed,
            autoDensity: true, // handles hiDPI screens
        });
        canvas_container.appendChild(papp.view);
        return papp;
    }
</script>

<div id="canvas_container" bind:this={canvas_container}>

</div>

<style>
    #canvas_container {
        margin: 0 auto;
        overflow: hidden;
        width: 80%;
        max-width: 1000px;
        position: relative;
        background-color: green;
        aspect-ratio: 16/10;
    }
</style>
