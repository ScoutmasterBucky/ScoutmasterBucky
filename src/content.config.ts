import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import yaml from 'js-yaml';

interface Resource {
    href?: string;
    text: string;
    type?: string;
}

const ResourceSchema: z.ZodSchema<Resource> = z.strictObject({
    href: z.string().url().optional(),
    text: z.string(),
    type: z
        .enum([
            'document',
            'docx',
            'image',
            'pdf',
            'podcast',
            'video',
            'website',
            'website with videos',
        ])
        .optional(),
});

interface Detail {
    children?: RequirementListItem[];
    detail: boolean;
    resources?: Resource[];
    text: string;
}

const DetailSchema: z.ZodSchema<Detail> = z.strictObject({
    children: z.lazy(() => z.array(RequirementListItemSchema).optional()),
    detail: z.boolean(),
    resources: z.lazy(() => z.array(ResourceSchema).optional()),
    text: z.string(),
});

interface Requirement {
    children?: RequirementListItem[];
    requirement: string | number;
    resources?: Resource[];
    text: string;
}

const RequirementSchema: z.ZodSchema<Requirement> = z.strictObject({
    children: z.lazy(() => z.array(RequirementListItemSchema).optional()),
    requirement: z.union([z.string(), z.number()]),
    resources: z.array(ResourceSchema).optional(),
    text: z.string(),
});

type RequirementListItem = Detail | Requirement;

const RequirementListItemSchema = z.union([DetailSchema, RequirementSchema]);

const events = defineCollection({
    loader: file('./src/data/events.yaml', {
        parser: text => {
            const array = yaml.load(text, { filename: 'events.yaml' }) as any[];
            let n = 1;

            for (const event of array) {
                event.id = `${n++}-${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            }

            return array;
        },
    }),
    schema: z.strictObject({
        end: z
            .string()
            .regex(/^\d{4}-\d{1,2}-\d{1,2}( \d{1,2}:\d{1,2})?$/)
            .optional(),
        host: z.string(),
        html: z.string().optional(),
        icon: z.string(),
        id: z.string(), // automatically generated
        location: z.array(z.string()).optional(),
        meritBadges: z.array(z.string()).optional(),
        noticeHtml: z.string().optional(),
        noticeTile: z.string().optional(),
        registrationLink: z.string().url().optional(),
        start: z.string().regex(/^\d{4}-\d{1,2}-\d{1,2}( \d{1,2}:\d{1,2})?$/),
        testLabs: z.array(z.string()).optional(),
        title: z.string(),
    }),
});

const historicalMeritBadges = defineCollection({
    loader: file('./src/data/historical-merit-badges.yaml'),
    schema: z.strictObject({
        name: z.string(),
        active: z.boolean(),
    }),
});

const meritBadgeRequirements = defineCollection({
    loader: glob({
        pattern: '**/requirements.yaml',
        base: './src/data/merit-badges',
        generateId: data => data.entry.split('/')[0],
    }),
    schema: z.array(RequirementListItemSchema),
});

const meritBadgeResources = defineCollection({
    loader: glob({
        pattern: '**/resources.yaml',
        base: './src/data/merit-badges',
        generateId: data => data.entry.split('/')[0],
    }),
    schema: z.array(
        z.strictObject({
            description: z.string().optional(),
            name: z.string(),
            shortName: z.string().optional(),
            url: z.string(),
        })
    ),
});

const meritBadges = defineCollection({
    loader: file('./src/data/merit-badges.yaml'),
    schema: z.strictObject({
        bucky: z.string(),
        eagle: z.boolean().optional(),
        image: z.string(),
        name: z.string(),
        otherAwards: z.array(z.string()),
        ranks: z.array(z.string()),
    }),
});

const otherAwardRequirements = defineCollection({
    loader: glob({
        pattern: '**/requirements.yaml',
        base: './src/data/other-awards',
        generateId: data => data.entry.split('/')[0],
    }),
    schema: z.array(RequirementListItemSchema),
});

const otherAwards = defineCollection({
    loader: file('./src/data/other-awards.yaml'),
    schema: z.strictObject({
        bucky: z.string(),
        image: z.string(),
        name: z.string(),
    }),
});

const scoutRankRequirements = defineCollection({
    loader: glob({
        pattern: '**/requirements.yaml',
        base: './src/data/scout-ranks',
        generateId: data => data.entry.split('/')[0],
    }),
    schema: z.array(RequirementListItemSchema),
});

const scoutRanks = defineCollection({
    loader: file('./src/data/scout-ranks.yaml'),
    schema: z.strictObject({
        bucky: z.string(),
        image: z.string(),
        name: z.string(),
        rank: z.boolean(),
    }),
});

const testLabRequirements = defineCollection({
    loader: glob({
        pattern: '**/requirements.yaml',
        base: './src/data/test-labs',
        generateId: data => data.entry.split('/')[0],
    }),
    schema: z.array(RequirementListItemSchema),
});

const testLabResources = defineCollection({
    loader: glob({
        pattern: '**/resources.yaml',
        base: './src/data/test-labs',
        generateId: data => data.entry.split('/')[0],
    }),
    schema: z.array(
        z.strictObject({
            description: z.string().optional(),
            name: z.string(),
            shortName: z.string().optional(),
            url: z.string(),
        })
    ),
});

const testLabs = defineCollection({
    loader: file('./src/data/test-labs.yaml'),
    schema: z.strictObject({
        expires: z.string(),
        image: z.string(),
        name: z.string(),
        patch: z.string().optional(),
        purchaseUrl: z.string().url().optional(),
        survey: z.string().url().optional(),
    }),
});

const updated = defineCollection({
    loader: file('./src/data/updated.json'),
    schema: z.record(z.string(), z.number()),
});

export const collections = {
    events,
    historicalMeritBadges,
    meritBadgeRequirements,
    meritBadgeResources,
    meritBadges,
    otherAwardRequirements,
    otherAwards,
    scoutRankRequirements,
    scoutRanks,
    testLabRequirements,
    testLabResources,
    testLabs,
    updated,
};
