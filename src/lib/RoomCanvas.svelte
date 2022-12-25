<script lang="ts">
    import * as PIXI from 'pixi.js';
    import { onMount } from 'svelte';

    let canvas_container;
    onMount(() => {
        initPixi();
    });

    function initPixi() {
        const papp = new PIXI.Application({
            width: 1024, height: 1024,
            backgroundColor: 0x00aaed,
            antialias: true,
            });

        canvas_container.appendChild(papp.view);
        let sprite = PIXI.Sprite.from('https://nduciveg.sirv.com/wired_cafe/catto.png');
        sprite.scale.x = sprite.scale.y = 0.2;
        papp.stage.addChild(sprite);

        let elapsed = 0.0;
        papp.ticker.add((delta) => {
            elapsed += delta;
            sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
        });
    }
</script>

<div bind:this={canvas_container}></div>
