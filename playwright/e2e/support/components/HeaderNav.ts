import { Page } from '@playwright/test'

/**
 * Navbar global (header): links partilhados entre páginas.
 * @see src/components/landing/Header.tsx
 */
export class HeaderNav {
    constructor(private page: Page) { }

    async goToOrderLookup() {
        const desktopLink = this.page
            .getByTestId('header-nav')
            .getByRole('link', { name: 'Consultar Pedido' })

        if (await desktopLink.isVisible({ timeout: 1000 }).catch(() => false)) {
            await desktopLink.click()
            return
        }

        await this.page.getByTestId('header-menu-toggle').click()
        await this.page
            .getByTestId('header-mobile-nav')
            .getByRole('link', { name: 'Consultar Pedido' })
            .click()
    }
}
