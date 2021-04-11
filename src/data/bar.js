export default
{
  id: 'balance',
  display: {
    position: {
      x: 550,
      y: 550,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    alpha: 1,
  },
  entities: [
    {
      id: 'balanceBackground',
      display: {
        position: {
          x: 10,
          y: -150,
        },
        scale: {
          x: 1,
          y: 1,
        },
        alpha: 1,
      },
      attributes: {
        textureId: 'balanceBackground',
      },
      components: [
        'Sprite',
      ],
    },
    {
      id: 'balanceBackground',
      display: {
        position: {
          x: 0,
          y: -150,
        },
      },
      attributes: {
        textureId: 'textBackground',
      },
      components: [
      ],
      entities: [
        {
          id: 'balanceText',
          display: {
            position: {
              x: 50,
              y: 70,
            },
          },
          attributes: {
            text: 'Balance: ',
            style: {
              fontSize: 40,
            },
          },
          components: [
            'Text',
          ],
          entities: [
            {
              id: 'balance-value',
              display: {
                position: {
                  x: 200,
                  y: 0,
                },
              },
              attributes: {
                text: '',
                style: {
                  fontSize: 40,
                },
              },
              components: [
                'Text',
              ],
            },
          ],
        },
        {
          id: 'win-text',
          display: {
            position: {
              x: 50,
              y: 140,
            },
          },
          attributes: {
            text: 'Win:',
            style: {
              fontSize: 40,
            },
          },
          components: [
            'Text',
          ],
          entities: [
            {
              id: 'win-value',
              display: {
                position: {
                  x: 200,
                  y: 0,
                },
              },
              attributes: {
                text: '',
                style: {
                  fontSize: 40,
                },
              },
              components: [
                'Text',
              ],
            },
          ],
        },
        {
          id: 'total-bet',
          display: {
            position: {
              x: 50,
              y: 210,
            },
          },
          attributes: {
            text: 'Total Bet:',
            style: {
              fontSize: 40,
            },
          },
          components: [
            'Text',
          ],
          entities: [
            {
              id: 'total-bet-value',
              display: {
                position: {
                  x: 200,
                  y: 0,
                },
              },
              attributes: {
                text: '',
                style: {
                  fontSize: 40,
                },
              },
              components: [
                'Text',
              ],
            },
          ],
        },
      ],
    },
  ],
  components: [
    'Bar',
  ],
};