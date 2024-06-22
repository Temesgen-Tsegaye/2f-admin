


// import { User,Prisma } from '@prisma/client';
import { PureAbility, AbilityBuilder, subject } from '@casl/ability';
import { createPrismaAbility} from '@casl/prisma';
import { PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()



const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);



const permission=[{'read':'Channel'}]
export async function  buildAbility(role){
    console.log(role,'role')
          const permission=await  prisma.role.findUnique({
            where: {
              name: role,
            },
           
          });
console.log(permission,'permissionnn')
    if(role==='admin'){

        

    
        
    
    }else if(role==='user'){
        can('read','Channel');
       
    
    }

      return build();

}
