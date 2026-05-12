import { Page, expect } from '@playwright/test'

import { HeaderNav } from '../components/HeaderNav'

/**
 * Rota `/` — hero e navegação inicial.
 * @see src/pages/Landing.tsx
 */
export class LandingPage {
    private readonly nav: HeaderNav

    constructor(private page: Page) {
        this.nav = new HeaderNav(page)
    }

    async goto() {
        await this.page.goto('/')
    }

    async expectHeroHeading() {
        await expect(this.page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    }

    /** Abre o ecrã de consulta a partir da navbar (componente global). */
    async openOrderLookupViaNav() {
        await this.nav.goToOrderLookup()
    }

    /** Fluxo e2e: home → validação da hero → link Consultar Pedido. */
    async openOrderLookupFromHome() {
        await this.goto()
        await this.expectHeroHeading()
        await this.openOrderLookupViaNav()
    }
}
