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
    {
      id: 'background',
      display: {
        position: {
          x: 0,
          y: 0,
        },
        scale: {
          x: 0,
          y: 0,
        },
        alpha: 1,
      },
      attributes: {
        textureId: 'background',
      },
      components: [
        'Sprite',
      ],
    },

    paytable.default,
    {
      id: 'reel-background',
      display: {
        position: {
          x: 425,
          y: 145,
        },
        scale: {
          x: 0.8,
          y: 1.05,
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
        textureId: 'spinButton'
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
