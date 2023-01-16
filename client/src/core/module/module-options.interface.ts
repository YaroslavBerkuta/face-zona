import { UserRole } from '@/typing/enums'
import { CvRouteOptions } from '../router'

export interface CvModuleOptions {
  routes: CvRouteOptions[]
  wrapper?(...args: any): JSX.Element
  name: string
  roles?: UserRole[]
}
