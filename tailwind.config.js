/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./apps/web/src/**/*.{html,ts,scss}'],
    theme: {
        extend: {
            fontFamily: {
                osrs: ['RuneScape UF'],
            },
            colors: {
                yellow: '#ffff00',
            },
            dropShadow: {
                osrs: '2px 2px 0px #000000',
            },
        },
    },
    plugins: [],
};
