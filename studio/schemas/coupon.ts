export default {
    name: 'coupon',
    title: 'Coupon',
    type: 'document',
    fields: [
        {
            name: 'code',
            title: 'Coupon Code',
            type: 'string',
            validation: (Rule: any) => Rule.required().uppercase(),
        },
        {
            name: 'discountType',
            title: 'Discount Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Percentage', value: 'percentage' },
                    { title: 'Fixed Amount', value: 'fixed' },
                ],
                layout: 'radio'
            },
            initialValue: 'percentage'
        },
        {
            name: 'value',
            title: 'Discount Value',
            type: 'number',
            description: 'Percentage (0-100) or Fixed Amount (in INR)',
            validation: (Rule: any) => Rule.required().min(0),
        },
        {
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            initialValue: true,
        },
    ],
}
