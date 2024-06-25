


import {Prisma } from '@prisma/client';
import { PureAbility, AbilityBuilder, subject } from '@casl/ability';
import { createPrismaAbility} from '@casl/prisma';
import { PrismaClient} from "@prisma/client"
import { create } from 'domain';
const prisma=new PrismaClient()





const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);


    
 export  function  buildAbility(user){
  
         user.role.permission.forEach(permission => {
                 if(permission.inverted){
                     if(Object.keys(permission.condition ||{}).length>0 && permission.field){
                        let resolvedCondition = {};
                        for (const key in permission.condition) {
                              if (permission.condition[key].startsWith('{') && permission.condition[key].endsWith('}')) {
                                const placeholder = permission.condition[key].slice(1, -1); 
                                resolvedCondition[key] = Number(user[placeholder]);
                              } else {
                                resolvedCondition[key] = permission.condition[key];
                              }
                            }
                  
                      cannot(permission.action,permission.subject,permission.field,resolvedCondition)
                     }else if(Object.keys(permission.condition||{}).length>0 ){
                        let resolvedCondition = {};
                        for (const key in permission.condition) {
                              if (permission.condition[key].startsWith('{') && permission.condition[key].endsWith('}')) {
                                const placeholder = permission.condition[key].slice(1, -1); 
                                resolvedCondition[key] = Number(user[placeholder]);
                              } else {
                                resolvedCondition[key] = permission.condition[key];
                              }
                            }
                        cannot(permission.action,permission.subject,resolvedCondition)
                     }else if(permission.field){
                      cannot(permission.action,permission.subject,permission.field,{createdby:10})
                     }else {
                      cannot(permission.action,permission.subject)
                     }

                 }else{
                  if(Object.keys(permission.condition ||{}).length>0 && permission.field){
                        let resolvedCondition = {};
                        for (const key in permission.condition) {
                              if (permission.condition[key].startsWith('{') && permission.condition[key].endsWith('}')) {
                                const placeholder = permission.condition[key].slice(1, -1); // Remove the curly braces
                                resolvedCondition[key] = Number(user[placeholder]);
                              } else {
                                resolvedCondition[key] = permission.condition[key];
                              }
                            }
                    can(permission.action,permission.subject,permission.field, resolvedCondition)
                   }else if(Object.keys(permission.condition ||{}).length>0 ){
                        let resolvedCondition = {};
                        for (const key in permission.condition) {
                              if (permission.condition[key].startsWith('{') && permission.condition[key].endsWith('}')) {
                                const placeholder = permission.condition[key].slice(1, -1); 
                                resolvedCondition[key] = Number(user[placeholder]);
                              } else {
                                resolvedCondition[key] = permission.condition[key];
                              }
                            }
                    can(permission.action,permission.subject,resolvedCondition)
                   }else if(permission.field){
                    can(permission.action,permission.subject,permission.field)
                   }else {
                    can(permission.action,permission.subject,{createdby:10})
                   }

                 }
      });

   

      return build();

}

