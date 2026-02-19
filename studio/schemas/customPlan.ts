export default {
    name: 'customPlan',
    title: 'Custom Plan',
    type: 'document',
    fields: [
        {
            name: 'planId',
            title: 'Plan ID',
            type: 'string',
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price (INR)',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Plan Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
}
