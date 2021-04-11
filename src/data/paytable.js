export default
{
  id: 'balance',
  display: {
    position: {
      x: 350,
      y: 520,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    alpha: 1,
  },
  attributes: {
    winlineIdMap: {
      0: '3xCherryTop',
      1: '3xCherryCenter',
      2: '3xCherryBottom',

      3: '3x7',
      4: '3x7',
      5: '3x7',

      6: '3x3xBAR',
      7: '3x3xBAR',
      8: '3x3xBAR',

      9: '3x2xBAR',
      10: '3x2xBAR',
      11: '3x2xBAR',

      12: '3xBAR',
      13: '3xBAR',
      14: '3xBAR',

      15: '3x7Cherry',
      16: '3x7Cherry',
      17: '3x7Cherry', 

      18: '3xBARCOMBO',
      19: '3xBARCOMBO',
      20: '3xBARCOMBO', 
    }
  },
  entities: [
    {
      id: 'paytableBackground',
      display: {
        position: {
          x: 10,
          y: -110,
        },
        scale: {
          x: 0.85,
          y: 0.60,
        },
        alpha: 1,
      },
      attributes: {
        textureId: 'paytableBackground',
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
          id: '3xCherryTop',
          display: {
            position: {
              x: 50,
              y: 70,
            },
          },
          attributes: {
            text: '3 x 🍒🍒🍒 TOP = 2000 ',
            style: {
              fontSize: 35,
            },
          },
          components: [
            'Text',
          ]
        },
        {
            id: '3xCherryCenter',
            display: {
              position: {
                x: 50,
                y: 120,
              },
            },
            attributes: {
              text: '3 x 🍒🍒🍒 CENTER  = 1000 ',
              style: {
                fontSize: 35,
              },
            },
            components: [
              'Text',
            ]
        },
        {
            id: '3xCherryBottom',
            display: {
              position: {
                x: 50,
                y: 170,
              },
            },
            attributes: {
              text: '3 x 🍒🍒🍒 BOTTOM  = 4000 ',
              style: {
                fontSize: 35,
              },
            },
            components: [
              'Text',
            ]
        },

        {
          id: '3x7',
          display: {
            position: {
              x: 50,
              y: 220,
            },
          },
          attributes: {
            text: '3 x 777 ANY LINE = 150 ',
            style: {
              fontSize: 35,
            },
          },
          components: [
            'Text',
          ]
        },

        {
          id: '3x7Cherry',
          display: {
            position: {
              x: 50,
              y: 270,
            },
          },
          attributes: {
            text: '3 x ANY CHERRY AND 7 COMBO = 75 ',
            style: {
              fontSize: 35,
            },
          },
          components: [
            'Text',
          ]
        },

        {
          id: '3x3xBAR',
          display: {
            position: {
              x: 50,
              y: 320,
            },
          },
          attributes: {
            text: '3 x 3xBAR ANY LINE = 50 ',
            style: {
              fontSize: 35,
            },
          },
          components: [
            'Text',
          ]
        },

        {
          id: '3x2xBAR',
          display: {
            position: {
              x: 50,
              y: 370,
            },
          },
          attributes: {
            text: '3 x 2xBAR ANY LINE = 20 ',
            style: {
              fontSize: 35,
            },
          },
          components: [
            'Text',
          ]
        },

        {
          id: '3xBAR',
          display: {
            position: {
              x: 50,
              y: 420,
            },
          },
          attributes: {
            text: '3 x BAR ANY LINE = 10 ',
            style: {
              fontSize: 35,
            },
          },
          components: [
            'Text',
          ]
        },

        {
          id: '3xBARCOMBO',
          display: {
            position: {
              x: 50,
              y: 470,
            },
          },
          attributes: {
            text: '3 x ANY BAR SYMBOL COMBO = 5',
            style: {
              fontSize: 35,
            },
          },
          components: [
            'Text',
          ]
        }
      ],
    },
  ],
  components: [
    'Paytable',
  ],
};