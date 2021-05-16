import { trigger, animate, style, group, query, transition } from '@angular/animations';
/*
REFERENCE: 
https://www.youtube.com/watch?v=7JA90VI9fAI

https://angular.io/guide/route-animations

I used the above video and documentation as a guide to help me 
develop the animations.
*/
export const newPageAnimation =
    trigger('routeAnimations', [
        transition('* => Home', pageSlide('left')),
        transition('* => Dashboard', pageSlide('right')),
        transition('Dashboard => *', pageSlide('left')),
        transition('Home => *', pageSlide('right')),
    ]);

function pageSlide(movementDir) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                width: '100%',
                position: 'absolute',
                [movementDir]: 0,
                margin: 0,
                overflowX: 'hidden'
            })
        ], optional),
        query(':enter', [
            style({ [movementDir]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('500ms ease', style({ [movementDir]: '100%' }))
            ], optional),
            query(':enter', [
                animate('500ms ease', style({ [movementDir]: '0%' }))
            ], optional),
        ])
    ];
}

/*END OF REFERENCE*/