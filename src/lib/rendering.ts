import * as PIXI from 'pixi.js';
import type { AssetData } from './asset_data';


export interface Renderable {
    id: string;
    spriteSrc: string;
    isAnimated: boolean;
    animationAtlas: PIXI.ISpritesheetData;
}

export function createSprite(d: AssetData): PIXI.Sprite | PIXI.AnimatedSprite {
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
