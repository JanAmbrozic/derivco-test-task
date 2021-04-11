import * as bar from './bar';
import * as slot from './slot';
import * as paytable from './paytable';

export default
{
  id: 'mainScene',
  attributes: {
    maxWidth: 1280,
    maxHeight: 720,
  },
  entities: [
    paytable.default,
    {
      id: 'reel-background',
      display: {
        position: {
          x: 425,
          y: 155,
        },
        scale: {
          x: 0.8,
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
