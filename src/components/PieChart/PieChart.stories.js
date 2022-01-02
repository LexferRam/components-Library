import React from 'react';
import { Story, Meta } from '@storybook/react';

import PieChart from './PieChart';

export default {
    title: 'LexferComponents/PieChart',
    component: PieChart,
    argTypes: {
    },
};

const Template = (args) => <PieChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    enviardataGraph: [
        ["Tarea", "Horas por Dia"],
        ["Trabajo", 11],
        ["Comer", 2],
        ["Entrenar", 2],
        ["Ver Tutoriales", 2],
        ["Dormir", 7],
    ],
    titulo: 'Actividades/Horas ',
};
