import type { PostModel } from '@/models';
import { getUrls } from '@/utils';

export const dataPosts: PostModel[] = [
    {
        PostID: 0,
        PostCode: '0',
        PostTitle:
            'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        PostImage: getUrls('/src/assets/images/demo/luffy.jpg'),
        Description:
            'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        Author: 'nnhiep',
        Date: '06/12/2023',
        TagID: [0, 1],
        TagName: ['shared', 'knownledge'],
        PostContent: `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Accusantium, ex velit molestias eligendi nihil, soluta vero sunt
        accusamus veniam possimus hic! Quas quos consectetur quidem omnis
        tenetur doloremque qui recusandae. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quisquam at culpa optio? Dolores
        dolorum dicta rerum recusandae! Id atque optio veritatis officia ex
        fugit totam ipsa doloremque, omnis, nam repudiandae! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ex nisi odit similique
        eos et.</p><p class="m-t-15"> Numquam quibusdam in recusandae aspernatur, nemo accusantium
        neque corporis, odit eius incidunt culpa assumenda provident
        voluptate! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <blockquote>Libero temporibus aliquid voluptates assumenda dolorum reprehenderit a, aperiam cupiditate ex officiis incidunt nemo illum eligendi eum
        soluta recusandae dicta voluptatum adipisci! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.</blockquote> Sunt tempora exercitationem
        aliquid amet assumenda harum odio obcaecati. Quos dolorem, delectus
        voluptatum suscipit neque quod quo, eveniet omnis, corrupti quis
        saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis cum fugiat laborum maiores beatae fugit? Culpa ipsam
        possimus neque illo eaque aperiam, quasi, aliquam pariatur, placeat
        laudantium quod! Unde, distinctio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Amet saepe sapiente, fugit veritatis,
        ullam quidem itaque dolore dolor quo aliquid accusantium voluptatem,
        quibusdam dolorum ad nemo maxime facere deleniti minima! Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Id, velit corrupti
        ullam officiis blanditiis dolores sit dicta dolorum minima suscipit.
        Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</p><h3 class="m-t-15">Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</h3>`,
    },
    {
        PostID: 1,
        PostCode: '1',
        PostTitle: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        PostImage: getUrls('/src/assets/images/demo/sabo.jpg'),
        Description:
            'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
        Author: 'nqminh1',
        Date: '07/12/2023',
        TagID: [0],
        TagName: ['shared'],
        PostContent: `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Accusantium, ex velit molestias eligendi nihil, soluta vero sunt
        accusamus veniam possimus hic! Quas quos consectetur quidem omnis
        tenetur doloremque qui recusandae. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quisquam at culpa optio? Dolores
        dolorum dicta rerum recusandae! Id atque optio veritatis officia ex
        fugit totam ipsa doloremque, omnis, nam repudiandae! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ex nisi odit similique
        eos et.</p><p class="m-t-15"> Numquam quibusdam in recusandae aspernatur, nemo accusantium
        neque corporis, odit eius incidunt culpa assumenda provident
        voluptate! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <blockquote>Libero temporibus aliquid voluptates assumenda dolorum reprehenderit a, aperiam cupiditate ex officiis incidunt nemo illum eligendi eum
        soluta recusandae dicta voluptatum adipisci! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.</blockquote> Sunt tempora exercitationem
        aliquid amet assumenda harum odio obcaecati. Quos dolorem, delectus
        voluptatum suscipit neque quod quo, eveniet omnis, corrupti quis
        saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis cum fugiat laborum maiores beatae fugit? Culpa ipsam
        possimus neque illo eaque aperiam, quasi, aliquam pariatur, placeat
        laudantium quod! Unde, distinctio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Amet saepe sapiente, fugit veritatis,
        ullam quidem itaque dolore dolor quo aliquid accusantium voluptatem,
        quibusdam dolorum ad nemo maxime facere deleniti minima! Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Id, velit corrupti
        ullam officiis blanditiis dolores sit dicta dolorum minima suscipit.
        Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</p><h3 class="m-t-15">Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</h3>`,
    },
    {
        PostID: 2,
        PostCode: '2',
        PostTitle: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old`,
        PostImage: getUrls('/src/assets/images/demo/ace.png'),
        Description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
        Author: 'nnhiep',
        Date: '08/12/2023',
        TagID: [0, 1],
        TagName: ['shared', 'knownledge'],
        PostContent: `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Accusantium, ex velit molestias eligendi nihil, soluta vero sunt
        accusamus veniam possimus hic! Quas quos consectetur quidem omnis
        tenetur doloremque qui recusandae. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quisquam at culpa optio? Dolores
        dolorum dicta rerum recusandae! Id atque optio veritatis officia ex
        fugit totam ipsa doloremque, omnis, nam repudiandae! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ex nisi odit similique
        eos et.</p><p class="m-t-15"> Numquam quibusdam in recusandae aspernatur, nemo accusantium
        neque corporis, odit eius incidunt culpa assumenda provident
        voluptate! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <blockquote>Libero temporibus aliquid voluptates assumenda dolorum reprehenderit a, aperiam cupiditate ex officiis incidunt nemo illum eligendi eum
        soluta recusandae dicta voluptatum adipisci! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.</blockquote> Sunt tempora exercitationem
        aliquid amet assumenda harum odio obcaecati. Quos dolorem, delectus
        voluptatum suscipit neque quod quo, eveniet omnis, corrupti quis
        saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis cum fugiat laborum maiores beatae fugit? Culpa ipsam
        possimus neque illo eaque aperiam, quasi, aliquam pariatur, placeat
        laudantium quod! Unde, distinctio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Amet saepe sapiente, fugit veritatis,
        ullam quidem itaque dolore dolor quo aliquid accusantium voluptatem,
        quibusdam dolorum ad nemo maxime facere deleniti minima! Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Id, velit corrupti
        ullam officiis blanditiis dolores sit dicta dolorum minima suscipit.
        Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</p><h3 class="m-t-15">Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</h3>`,
    },
    {
        PostID: 3,
        PostCode: '3',
        PostTitle: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old`,
        PostImage: getUrls('/src/assets/images/demo/ace.png'),
        Description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
        Author: 'nnhiep',
        Date: '08/12/2023',
        TagID: [0, 1],
        TagName: ['shared', 'knownledge'],
        PostContent: `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Accusantium, ex velit molestias eligendi nihil, soluta vero sunt
        accusamus veniam possimus hic! Quas quos consectetur quidem omnis
        tenetur doloremque qui recusandae. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quisquam at culpa optio? Dolores
        dolorum dicta rerum recusandae! Id atque optio veritatis officia ex
        fugit totam ipsa doloremque, omnis, nam repudiandae! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ex nisi odit similique
        eos et.</p><p class="m-t-15"> Numquam quibusdam in recusandae aspernatur, nemo accusantium
        neque corporis, odit eius incidunt culpa assumenda provident
        voluptate! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <blockquote>Libero temporibus aliquid voluptates assumenda dolorum reprehenderit a, aperiam cupiditate ex officiis incidunt nemo illum eligendi eum
        soluta recusandae dicta voluptatum adipisci! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.</blockquote> Sunt tempora exercitationem
        aliquid amet assumenda harum odio obcaecati. Quos dolorem, delectus
        voluptatum suscipit neque quod quo, eveniet omnis, corrupti quis
        saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis cum fugiat laborum maiores beatae fugit? Culpa ipsam
        possimus neque illo eaque aperiam, quasi, aliquam pariatur, placeat
        laudantium quod! Unde, distinctio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Amet saepe sapiente, fugit veritatis,
        ullam quidem itaque dolore dolor quo aliquid accusantium voluptatem,
        quibusdam dolorum ad nemo maxime facere deleniti minima! Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Id, velit corrupti
        ullam officiis blanditiis dolores sit dicta dolorum minima suscipit.
        Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</p><h3 class="m-t-15">Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</h3>`,
    },
    {
        PostID: 4,
        PostCode: '4',
        PostTitle: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old`,
        PostImage: getUrls('/src/assets/images/demo/ace.png'),
        Description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
        Author: 'nnhiep',
        Date: '08/12/2023',
        TagID: [0],
        TagName: ['shared'],
        PostContent: `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Accusantium, ex velit molestias eligendi nihil, soluta vero sunt
        accusamus veniam possimus hic! Quas quos consectetur quidem omnis
        tenetur doloremque qui recusandae. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quisquam at culpa optio? Dolores
        dolorum dicta rerum recusandae! Id atque optio veritatis officia ex
        fugit totam ipsa doloremque, omnis, nam repudiandae! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ex nisi odit similique
        eos et.</p><p class="m-t-15"> Numquam quibusdam in recusandae aspernatur, nemo accusantium
        neque corporis, odit eius incidunt culpa assumenda provident
        voluptate! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <blockquote>Libero temporibus aliquid voluptates assumenda dolorum reprehenderit a, aperiam cupiditate ex officiis incidunt nemo illum eligendi eum
        soluta recusandae dicta voluptatum adipisci! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.</blockquote> Sunt tempora exercitationem
        aliquid amet assumenda harum odio obcaecati. Quos dolorem, delectus
        voluptatum suscipit neque quod quo, eveniet omnis, corrupti quis
        saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis cum fugiat laborum maiores beatae fugit? Culpa ipsam
        possimus neque illo eaque aperiam, quasi, aliquam pariatur, placeat
        laudantium quod! Unde, distinctio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Amet saepe sapiente, fugit veritatis,
        ullam quidem itaque dolore dolor quo aliquid accusantium voluptatem,
        quibusdam dolorum ad nemo maxime facere deleniti minima! Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Id, velit corrupti
        ullam officiis blanditiis dolores sit dicta dolorum minima suscipit.
        Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</p><h3 class="m-t-15">Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</h3>`,
    },
    {
        PostID: 5,
        PostCode: '5',
        PostTitle: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old`,
        PostImage: getUrls('/src/assets/images/demo/ace.png'),
        Description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
        Author: 'nnhiep',
        Date: '08/12/2023',
        TagID: [0],
        TagName: ['shared'],
        PostContent: `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Accusantium, ex velit molestias eligendi nihil, soluta vero sunt
        accusamus veniam possimus hic! Quas quos consectetur quidem omnis
        tenetur doloremque qui recusandae. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quisquam at culpa optio? Dolores
        dolorum dicta rerum recusandae! Id atque optio veritatis officia ex
        fugit totam ipsa doloremque, omnis, nam repudiandae! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Ex nisi odit similique
        eos et.</p><p class="m-t-15"> Numquam quibusdam in recusandae aspernatur, nemo accusantium
        neque corporis, odit eius incidunt culpa assumenda provident
        voluptate! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <blockquote>Libero temporibus aliquid voluptates assumenda dolorum reprehenderit a, aperiam cupiditate ex officiis incidunt nemo illum eligendi eum
        soluta recusandae dicta voluptatum adipisci! Lorem ipsum dolor sit
        amet consectetur adipisicing elit.</blockquote> Sunt tempora exercitationem
        aliquid amet assumenda harum odio obcaecati. Quos dolorem, delectus
        voluptatum suscipit neque quod quo, eveniet omnis, corrupti quis
        saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Perspiciatis cum fugiat laborum maiores beatae fugit? Culpa ipsam
        possimus neque illo eaque aperiam, quasi, aliquam pariatur, placeat
        laudantium quod! Unde, distinctio. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Amet saepe sapiente, fugit veritatis,
        ullam quidem itaque dolore dolor quo aliquid accusantium voluptatem,
        quibusdam dolorum ad nemo maxime facere deleniti minima! Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Id, velit corrupti
        ullam officiis blanditiis dolores sit dicta dolorum minima suscipit.
        Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</p><h3 class="m-t-15">Excepturi earum ducimus dicta explicabo nam, reiciendis sint sunt
        accusamus.</h3>`,
    },
];
