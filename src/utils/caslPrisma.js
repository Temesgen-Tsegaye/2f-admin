// import { User,Prisma } from '@prisma/client';
import { PureAbility, AbilityBuilder, subject } from '@casl/ability';
import { createPrismaAbility} from '@casl/prisma';


const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);




export function buildAbility(role){
    if(role==='admin'){
        can('read', 'Channel');
        can('create', 'Channel');
    
        
    
    }else if(role==='user'){
        can('read','Channel');
    
    }

      return build();

}
