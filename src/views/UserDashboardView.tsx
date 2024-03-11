import React from 'react'
import styled from 'styled-components'
import useFetchPlans from '../hooks/useFetchPlans'
import NoPlansFound from '../components/NoPlansfound'
import Loading from '../components/Loading'

const DashboardContainer = styled.div`
  background: ${({ theme }) => theme.colors.yellow};
  height: 90vh;
`

export default function UserDashboardView() {
  const { plans, loading, getPlans } = useFetchPlans()

  React.useEffect(() => {
    getPlans()
  }, [getPlans])

  return (
    <DashboardContainer>
      {loading ? (
        <Loading/>
      ) : plans.length > 0 ? (
        plans.map((plan) => <h1 key={plan.id}>{plan.description}</h1>)
      ) : (
        <NoPlansFound carta="produto/serviço" />
      )}
    </DashboardContainer>
  )
}
