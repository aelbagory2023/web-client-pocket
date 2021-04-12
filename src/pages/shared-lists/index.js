import Main from 'containers/shared-lists/shared-lists'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LOCALE_COMMON } from 'common/constants'
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...LOCALE_COMMON])),
      authRequired: true
    }
  }
}

export default Main
