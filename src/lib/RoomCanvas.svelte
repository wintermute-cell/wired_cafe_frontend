<script lang="ts">
    import * as PIXI from 'pixi.js';
    import { onMount } from 'svelte';
    import { skins, type AssetData } from './asset_data'

    let knownSprites: { [id: string]: PIXI.AnimatedSprite | PIXI.Sprite } = {};
    let papp;

    function createSpriteFromAssetData(d: AssetData): PIXI.Sprite | PIXI.AnimatedSprite {
        let sprite: PIXI.Sprite | PIXI.AnimatedSprite;
        if (d.atlasSrc) { // if asset is animated
            // TODO: have to fetch atlas from source, and then the commented code should work
            //let sheet;
            //sheet = new PIXI.Spritesheet(
            //    PIXI.BaseTexture.from(r.spriteSrc),
            //    r.animationAtlas,
            //);
            //sheet.parse();
            //sprite = new PIXI.AnimatedSprite(sheet.animations.main);
        } else {
            sprite = PIXI.Sprite.from(d.src);
        }
        return sprite;
    }

    export function makeSprite(id: string, assetName: string) {
        if (!papp) {
            console.warn("Attempting to create sprite before papp is initialized!");
            return;
        }
        if (knownSprites[id]) {
            console.warn("Attempting to create sprite for existent id! ", id);
            return;
        }
        let assetData: AssetData = skins[assetName];
        if (!assetData) console.error("Unknown assetName: ", assetName);
        
        let newSprite;
        if (assetData.atlasSrc !== "") {
            newSprite = <PIXI.AnimatedSprite>createSpriteFromAssetData(assetData);
            newSprite.play(); 
        } else newSprite = <PIXI.Sprite>createSpriteFromAssetData(assetData);

        knownSprites[id] = newSprite;

        // todo the data has to come from somewhere else, but whos deciding on it?
        newSprite.scale.x = 0.4;
        newSprite.scale.y = 0.4;
        newSprite.position.x = Math.random()*100;
        newSprite.position.y = Math.random()*100;
        papp.stage.addChild(newSprite);
    }

    export function destroySprite(id: string) {
        if (!papp) {
            console.warn("Attempting to destroy sprite before papp is initialized!");
            return;
        }
        if (!knownSprites[id]) return;
        papp.stage.removeChild(knownSprites[id]);
        delete knownSprites[id];
    }

    let canvas_container: any; // has to be any, else view cant be attached.
    onMount(() => {
        papp = initPixi();
        let initial_width = papp.renderer.width;

        // resize the canvas itself, scale the contents accordingly
        // every time the window is resized.
        function debounceEvent(func){
            var timer;
            return function(event){
                if(timer) clearTimeout(timer);
                timer = setTimeout(func,100,event);
            };
        }
        function resizeToContainer() {
            papp.renderer.resize(canvas_container.offsetWidth, canvas_container.offsetHeight);
            let scale = papp.renderer.width / initial_width;
            papp.stage.scale.set(scale);
        }
        window.addEventListener('resize', debounceEvent(resizeToContainer));
        resizeToContainer();
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
