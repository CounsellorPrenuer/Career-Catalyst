export default {
    name: 'pricing',
    title: 'Standard Package',
    type: 'document',
    fields: [
        {
            name: 'planId',
            title: 'Plan ID',
            type: 'string',
        },
        {
            name: 'planName',
            title: 'Plan Title', // Renamed to match user table "Title" but kept key for compatibility logic or change it? User said "Plan ID, Title...". Let's keep planName as key but update title.
            type: 'string',
        },
        {
            name: 'category',
            title: 'Subgroup', // 8-9 Students etc.
            type: 'string',
            options: {
                list: [
                    { title: '8-9 Students', value: '8-9 Students' },
                    { title: '10-12 Students', value: '10-12 Students' },
                    { title: 'Graduates', value: 'Graduates' },
                    { title: 'Working Professionals', value: 'Working Professionals' },
                ],
            },
        },
        {
            name: 'price',
            title: 'Price',
            type: 'string',
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'text', type: 'string', title: 'Feature Text' },
                        { name: 'included', type: 'boolean', title: 'Included (Default True)', initialValue: true },
                    ],
                },
            ],
        },
    ],
}
