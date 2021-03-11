import Main from 'containers/my-collections/my-collections'

export async function getStaticProps() {
  return { props: { namespacesRequired: ['common'] } }
}

export default Main
