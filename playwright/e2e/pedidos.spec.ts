import { test } from '@playwright/test'

import { generateOrderCode } from './support/helpers'

import { LandingPage } from './support/pages/LandingPage'
import { OrderLookupPage, type OrderDetails } from './support/pages/OrderLookupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ page }) => {
    // Arrange
    const landingPage = new LandingPage(page)
    await landingPage.openOrderLookupFromHome()

    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.expectLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-AZ1H0G',
      status: 'APROVADO',
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'DANIELA DE OLIVEIRA',
        email: 'danirabelo81@gmail.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.expectOrderResultAriaSnapshot(order)
    await orderLookupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-5OM1CX',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.expectOrderResultAriaSnapshot(order)
    await orderLookupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-N17UAH',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(order.number)

    // Assert
    await orderLookupPage.expectOrderResultAriaSnapshot(order)
    await orderLookupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(order)

    await orderLookupPage.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código está fora do padrão esperado', async ({ page }) => {
    // Padrão esperado na app: VLO- + 6 caracteres alfanuméricos (ex.: VLO-ABCD10)
    const codigoForaDoPadrao = 'MEU-CODIGO-INVALIDO'

    const orderLookupPage = new OrderLookupPage(page)
    await orderLookupPage.searchOrder(codigoForaDoPadrao)

    await orderLookupPage.validateOrderNotFound()
  })
})

