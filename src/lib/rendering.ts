import * as PIXI from 'pixi.js';


export interface Renderable {
    spriteSrc: string;
    isAnimated: boolean;
    animationAtlas: PIXI.ISpritesheetData;
}

export function createSprite(r: Renderable): PIXI.Sprite | PIXI.AnimatedSprite {
    let sprite: PIXI.Sprite | PIXI.AnimatedSprite;
    if (r.isAnimated) {
        let sheet;
        sheet = new PIXI.Spritesheet(
            PIXI.BaseTexture.from(r.spriteSrc),
            r.animationAtlas,
        );
        sheet.parse();
        sprite = new PIXI.AnimatedSprite(sheet.animations.main);
    } else {
        sprite = PIXI.Sprite.from(r.spriteSrc);
    }
    return sprite;
}
