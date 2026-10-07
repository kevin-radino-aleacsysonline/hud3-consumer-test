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

const LANDSCAPE_DESIGN_SIZE = { width: 1200, height: 675 };
const PORTRAIT_DESIGN_SIZE = { width: 675, height: 1200 };

const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 0;

function isMobile(): boolean {
    return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
}

function getLayout(width: number, height: number): HudLayout {
    if (!isMobile()) {
        return HudLayout.Desktop;
    }

    return height > width ? HudLayout.MobilePortrait : HudLayout.MobileLandscape;
}

function resize(): void {
    const { width, height } = game!.getBoundingClientRect();
    const layout = getLayout(width, height);
    const baseSize = layout === HudLayout.MobilePortrait ? PORTRAIT_DESIGN_SIZE : LANDSCAPE_DESIGN_SIZE;
    const scale = Math.min(width / baseSize.width, height / baseSize.height);

    hud.resize({
        layout,
        size: { width, height },
        designSize: { width: width / scale, height: height / scale },
        scale,
        isApple,
    });
}

new ResizeObserver(resize).observe(game);
window.addEventListener('orientationchange', resize);

resize();
