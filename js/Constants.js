const sprite = {
    'width': 140,
    'height':140,
    'red': {
        'solid':{
            'x': 69,
            'y':27
        },
        'vstriped':{
            'x': 79,
            'y': 212
        },
        'hstriped':{
            'x': 83,
            'y': 402
        },
        'wrapped':{
            'x': 83,
            'y': 599
        }
    },
    'purple': {
        'solid':{
            'x': 294,
            'y': 36
        },
        'vstriped':{
            'x': 295,
            'y': 212
        },
        'hstriped':{
            'x': 295,
            'y': 402
        },
        'wrapped':{
            'x': 290,
            'y': 599
        }
    },
    'orange': {
        'solid':{
            'x': 497,
            'y': 34
        },
        'vstriped':{
            'x': 497,
            'y': 214
        },
        'hstriped':{
            'x': 492,
            'y': 396
        },
        'wrapped':{
            'x': 485,
            'y': 602
        },
    },
    'green': {
        'solid':{
            'x': 697,
            'y': 32
        },
        'vstriped':{
            'x': 694,
            'y': 210
        },
        'hstriped':{
            'x': 694,
            'y': 396
        },
        'wrapped':{
            'x': 701,
            'y': 601
        }
    },
    'blue': {
        'solid':{
            'x': 933,
            'y': 34
        },
        'vstriped':{
            'x': 932,
            'y': 203
        },
        'hstriped':{
            'x': 932,
            'y': 402
        },
        'wrapped':{
            'x': 933,
            'y': 607
        }
    },
    'yellow': {
        'solid':{
            'x': 1135,
            'y': 32
        },
        'vstriped':{
            'x': 1135,
            'y': 203
        },
        'hstriped':{
            'x': 1135,
            'y': 405
        },
        'wrapped':{
            'x': 1140,
            'y': 601
        },
    },
    'color_bomb':{
        'x': 78,
        'y': 784
    }
};

const COLORS = ['red', 'purple', 'orange', 'green', 'blue', 'yellow'];
const CANDY_WIDTH = 40;
const CANDY_HEIGHT = 40;
const GRID_WIDTH = 50;
const GRID_HEIGHT = 50;
const CANDY_PADDING = 5; 
const MOVE_UP = 1;
const MOVE_DOWN = 2;
const MOVE_LEFT = 3;
const MOVE_RIGHT = 4;
const DONT_MOVE = 5;
const MATCH_HOR = 6;
const MATCH_VER = 7;
const INITIAL_CLEAR = 8;
const USER_CLEAR = 9;