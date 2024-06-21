// import { User,Prisma } from '@prisma/client';
import { PureAbility, AbilityBuilder, subject } from '@casl/ability';
import { createPrismaAbility} from '@casl/prisma';


const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);

// can('read', 'Post', { authorId: 1 });
// cannot('read', 'Post', { title: { startsWith: '[WIP]:' } });

// const ability = build();
// ability.can('read', 'Post');
// ability.can('read', subject('Post', { title: '...', authorId: 1 })));

export function buildAbility(role){
    if(role==='admin'){
   console.log(role,'roleeee')
        can('read', 'Channel');
        can('create', 'Channel');
    
    }else if(role==='user'){
        can('read','Channel');
    
    }

      return build();

}
