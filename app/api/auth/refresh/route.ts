import { NextRequest, NextResponse } from 'next/server'

import { ApiUtils } from '@/utils'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const bearerData = ApiUtils.getBearerData(request)

  if (!bearerData) return ApiUtils.redirectHome

  const dto = {
    refresh_token: bearerData.refreshToken,
    grant_type: 'refresh_token',
  }

  console.log(dto)

  return NextResponse.json('ok')
}
