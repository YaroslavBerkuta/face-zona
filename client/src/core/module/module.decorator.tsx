/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { CvModuleOptions } from './module-options.interface'
import { CvRouter } from '../router'

export const CvModule = (params: CvModuleOptions) => {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      routes = params.routes
      wrapper = params.wrapper
      name = params.name
      roles = params.roles

      render(): JSX.Element {
        return (
          <CvRouter
            roles={params.roles}
            items={params.routes}
            wrapper={this.wrapper}
            basePath={this.name}
          />
        )
      }
    }
  }
}
