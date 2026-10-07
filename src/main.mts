import 'package-hud3/style.css';
import { HudLayout, HudService } from 'package-hud3';

const game = document.querySelector<HTMLElement>('#game');

if (!game) {
    throw new Error('Game element not found.');
}

const hud = new HudService();

hud.locale = 'nl-BE';
hud.currency = 'EUR';

hud.stats.balance = 1000;
hud.stats.totalWon = 30;
hud.stats.totalBet = 0.5;

hud.stake.value = 0.5;

hud.stake.values = [0.25, 0.5, 1, 2, 5, 10];

hud.buyBonus.visible = true;

hud.buyBonus.bonuses = [
    {
        id: 'mystery',
        name: 'Mystery Bonus',
        multiplier: 160,
    },
    {
        id: 'adventure',
        name: 'Adventure Bonus',
        multiplier: 200,
    },
    {
        id: 'ultimate',
        name: 'Ultimate Bonus',
        multiplier: 400,
    },
];

hud.playButton.onClick.add(() => {
    console.log('PLAY');
});

hud.fastPlay.onClick.add(() => {
    hud.fastPlay.active = !hud.fastPlay.active;

    console.log('Fast play:', hud.fastPlay.active);
});

hud.stake.onChange.add(({ value, bonusBet }) => {
    console.log('Stake changed:', {
        value,
        bonusBet,
    });

    hud.stats.totalBet = value;
});

hud.buyBonus.onBuy.add((event) => {
    console.log('Buy bonus:', event);
});

hud.settings.onVolumeChange.add((value) => {
    console.log('Volume:', value);
});

hud.settings.onQuit.add(() => {
    console.log('QUIT');
});

hud.mount(game);

const rect = game.getBoundingClientRect();

hud.resize({
    layout: HudLayout.Desktop,

    size: {
        width: rect.width,
        height: rect.height,
    },

    designSize: {
        width: 1200,
        height: 675,
    },

    scale: Math.min(rect.width / 1200, rect.height / 675),
});
