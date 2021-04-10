import * as bar from './bar';
import * as slot from './slot';

export default
{
  id: 'mainScene',
  attributes: {
    maxWidth: 1280,
    maxHeight: 720,
  },
  entities: [
    {
      id: 'reel-background',
      display: {
        position: {
          x: 260,
          y: 20,
        },
        scale: {
          x: 1,
          y: 1,
        },
        alpha: 1,
      },
      attributes: {
        textureId: 'reelBackground',
      },
      components: [
        'Sprite',
      ],
    },
    slot.default,
    {
      id: 'spin-button',
      display: {
        position: {
          x: 1200,
          y: 360,
        },
      },
      attributes: {
        touchEvent: 'spin',
        textureId: 'spinButton',
      },
      entities: [
      ],
      components: [
        'Button',
      ],
    },
    bar.default,
  ],
};