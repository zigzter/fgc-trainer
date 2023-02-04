/**
 * Generates the input info to save on typing and potential refactoring
 */
const genInput = (input: string) => {
    const [name, type] = input.split(':');
    return {
        name,
        type,
    };
};

const movements = ['up:movement', 'down:movement', 'right:movement', 'left:movement'] as const;

export default {
    nintendo: [
        ...movements,
        'a:button',
        'b:button',
        'x:button',
        'y:button',
        'lb:button',
        'rb:button',
        'zr:button',
        'zl:button',
    ],
    pc: [...movements],
    xbox: [
        ...movements,
        'a:button',
        'b:button',
        'x:button',
        'y:button',
        'lt:button',
        'lb:button',
        'rt:button',
        'rb:button',
    ].map(genInput),
    playstation: [
        ...movements,
        'cross:button',
        'circle:button',
        'triangle:button',
        'square:button',
        'l1:button',
        'l2:button',
        'r1:button',
        'r2:button',
    ].map(genInput),
} as const;
