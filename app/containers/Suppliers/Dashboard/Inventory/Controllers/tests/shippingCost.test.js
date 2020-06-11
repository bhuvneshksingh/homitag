import { getShippingCost } from '../shippingCost'

describe('Shipping Cost', () => {
  it('Should return shipping cost ', () => {
    // 0
    const item = {
      DeliveryMethods: [
        {
          id: '0de53a42-574a-4180-a5a5-aea0b7d6131a',
          name: 'Ship independently',
          code: 'shipindependently',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                valueSelected: true,
              },
            },
          },
        },
      ],
    }
    // 0
    const item2 = {
      DeliveryMethods: [
        {
          id: '6d820c00-87e5-482a-801d-da6c5fcec4b3',
          name: 'Homitag Shipping',
          code: 'homitagshipping',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                valueSelected: true,
              },
            },
          },
        },
      ],
    }
    // 0
    const item3 = {
      DeliveryMethods: [
        {
          id: '6d820c00-87e5-482a-801d-da6c5fcec4b3',
          name: 'Homitag Shipping',
          code: 'homitagshipping',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                valueSelected: true,
              },
            },
          },
        },
      ],
    }
    // 0
    const item4 = {
      DeliveryMethods: [
        {
          id: '6d820c00-87e5-482a-801d-da6c5fcec4b3',
          name: 'Homitag Shipping',
          code: 'homitagshipping',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                valueSelected: true,
              },
            },
          },
        },
      ],
    }
    // 20
    const item5 = {
      DeliveryMethods: [
        {
          id: '0de53a42-574a-4180-a5a5-aea0b7d6131a',
          name: 'Ship independently',
          code: 'shipindependently',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                valueSelected: false,
              },
              shippingCost: '20',
            },
          },
        },
      ],
    }
    // 20
    const item6 = {
      DeliveryMethods: [
        {
          id: '6d820c00-87e5-482a-801d-da6c5fcec4b3',
          name: 'Homitag Shipping',
          code: 'homitagshipping',
          order: 2,
          active: true,
          iconUrl: '',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                title: 'Offer Free Shipping',
                description:
                  'Items sell faster with free shipping! Shipping cost will be deducted from your earnings.',
                valueSelected: false,
              },
              optionsAvailable: [
                {
                  selected: false,
                  providers: [
                    {
                      code: 'FED01',
                      cost: '6.50',
                      provider: 'Fedex',
                      selected: false,
                      weightRange: '0 – 0.5 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS01',
                      cost: '20.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '0 – 0.5 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP01',
                      cost: '4.25',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '0 – 0.5 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '0 – 0.5 lbs',
                },
                {
                  selected: false,
                  providers: [
                    {
                      code: 'FED02',
                      cost: '9.50',
                      provider: 'Fedex',
                      selected: false,
                      weightRange: '0.5 – 1 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS02',
                      cost: '20.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '0.5 – 1 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP02',
                      cost: '5.25',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '0.5 – 1 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '0.5 – 1 lbs',
                },
                {
                  selected: false,
                  providers: [
                    {
                      code: 'FED03',
                      cost: '9.90',
                      provider: 'Fedex',
                      selected: false,
                      weightRange: '1 – 3 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS03',
                      cost: '20.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '1 – 3 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP03',
                      cost: '11.00',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '1 – 3 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '1 – 3 lbs',
                },
                {
                  selected: false,
                  providers: [
                    {
                      code: 'FED04',
                      cost: '11.50',
                      provider: 'Fedex',
                      selected: false,
                      weightRange: '3 – 10 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS04',
                      cost: '30.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '3 – 10 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP04',
                      cost: '16.00',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '3 – 10 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '3 – 10 lbs',
                },
                {
                  selected: false,
                  providers: [
                    {
                      code: 'FED05',
                      cost: '17.00',
                      provider: 'Fedex',
                      selected: false,
                      weightRange: '10 – 20 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS05',
                      cost: '40.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '10 – 20 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP05',
                      cost: '30.00',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '10 – 20 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '10 – 20 lbs',
                },
                {
                  selected: true,
                  providers: [
                    {
                      code: 'FED06',
                      cost: '35.00',
                      provider: 'Fedex',
                      selected: true,
                      weightRange: '20 – 40 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS06',
                      cost: '50.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '20 – 40 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP06',
                      cost: '48.00',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '20 – 40 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '20 – 40 lbs',
                },
                {
                  selected: false,
                  providers: [
                    {
                      code: 'FED07',
                      cost: '50.00',
                      provider: 'Fedex',
                      selected: false,
                      weightRange: '40 – 70 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS07',
                      cost: '90.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '40 – 70 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP07',
                      cost: '85.00',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '40 – 70 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '40 – 70 lbs',
                },
                {
                  selected: false,
                  providers: [
                    {
                      code: 'FED08',
                      cost: '65.00',
                      provider: 'Fedex',
                      selected: false,
                      weightRange: '70 – 100 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS08',
                      cost: '120.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '70 – 100 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP08',
                      cost: '100.00',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '70 – 100 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '70 – 100 lbs',
                },
                {
                  selected: false,
                  providers: [
                    {
                      code: 'FED09',
                      cost: '90.00',
                      provider: 'Fedex',
                      selected: false,
                      weightRange: '100 – 150 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'UPS09',
                      cost: '160.00',
                      provider: 'UPS',
                      selected: false,
                      weightRange: '100 – 150 lbs',
                      deliverTimeRange: '1-5 days',
                    },
                    {
                      code: 'USP09',
                      cost: '130.00',
                      provider: 'USPS',
                      selected: false,
                      weightRange: '100 – 150 lbs',
                      deliverTimeRange: '1-3 days',
                    },
                  ],
                  weightRange: '100 – 150 lbs',
                },
              ],
            },
          },
        },
      ],
    }

    const item7 = {
      DeliveryMethods: [
        {
          id: '0de53a42-574a-4180-a5a5-aea0b7d6131a',
          name: 'Ship independently',
          code: 'shipindependently',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                valueSelected: false,
              },
              shippingCost: '2',
            },
          },
        },
        {
          id: 'b74eb94a-4fd2-44ae-9828-4ddab1368d5e',
          name: 'In-Person Pickup',
          code: 'pickup',
          DeliveryMethodPerPost: {
            customProperties: {},
          },
        },
      ],
    }

    const item8 = {
      DeliveryMethods: [
        {
          id: '0de53a42-574a-4180-a5a5-aea0b7d6131a',
          name: 'Ship independently',
          code: 'shipindependently',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                valueSelected: false,
              },
              shippingCost: 25,
            },
          },
        },
      ],
    }

    const item9 = {
      DeliveryMethods: [
        {
          id: '0de53a42-574a-4180-a5a5-aea0b7d6131a',
          name: 'Ship independently',
          code: 'shipindependently',
          DeliveryMethodPerPost: {
            customProperties: {
              shippingCost: '19',
              returnAddresses: [{}],
            },
          },
        },
      ],
    }

    const item10 = {
      DeliveryMethods: [
        {
          id: '0de53a42-574a-4180-a5a5-aea0b7d6131a',
          name: 'Ship independently',
          code: 'shipindependently',
          DeliveryMethodPerPost: {
            customProperties: {
              shippingCost: '',
            },
          },
        },
      ],
    }

    const item11 = {
      DeliveryMethods: [
        {
          id: '6d820c00-87e5-482a-801d-da6c5fcec4b3',
          name: 'Homitag Shipping',
          code: 'homitagshipping',
          DeliveryMethodPerPost: {
            customProperties: {},
          },
        },
      ],
    }

    const item12 = {
      DeliveryMethods: [
        {
          id: '0de53a42-574a-4180-a5a5-aea0b7d6131a',
          name: 'Ship independently',
          code: 'shipindependently',
          DeliveryMethodPerPost: {
            customProperties: {
              freeOption: {
                valueSelected: false,
              },
            },
          },
        },
      ],
    }

    expect(getShippingCost(item)).toBe(0)
    expect(getShippingCost(item2)).toBe(0)
    expect(getShippingCost(item3)).toBe(0)
    expect(getShippingCost(item4)).toBe(0)
    expect(getShippingCost(item5)).toBe(20)
    expect(getShippingCost(item6)).toBe(35)
    expect(getShippingCost(item7)).toBe(2)
    expect(getShippingCost(item8)).toBe(25)
    expect(getShippingCost(item9)).toBe(19)
    expect(getShippingCost(item10)).toBe(0)
    expect(getShippingCost(item11)).toBe(0)
    expect(getShippingCost(item12)).toBe(0)
  })
})
