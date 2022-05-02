import { filter, find, map, merge } from 'lodash/fp'

import {
   Interpretation,
   TagMetadata,
   Template,
   AsylumApi as api,
} from '@asylum-ui/connection-library'

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { GameWithMetadata } from 'store/app-store'
import { InterpretationWithMetadata, TemplateWithMetadata } from 'types'
import { getAllFiles, getFile } from 'utils'

export const fetchGamesByAccount = async (
   account: InjectedAccountWithMeta
): Promise<GameWithMetadata[]> => {
   const games = await api.games()

   const allowedGames = filter({ owner: account.address }, games)
   const allowedGameIds = map('id', allowedGames)
   const gamesMetadataCid = map(
      'data',
      await Promise.all(map(api.gameMetadataOf.bind(api), allowedGameIds))
   )
   const gamesMetadata = await getAllFiles(gamesMetadataCid)

   return map((game) => merge(game, find({ id: game.id }, gamesMetadata)), allowedGames)
}

export const fetchPlayersCount = async (): Promise<number> => {
   const tickets = await api.tickets()
   return tickets?.length || 0
}

export const fetchTags = async (): Promise<TagMetadata[]> => {
   const tags = await api.tags()
   return (await getAllFiles(map('metadata', tags))) as TagMetadata[]
}

export const fetchTemplateMetadata = async (template: Template): Promise<TemplateWithMetadata> => {
   const metadata: any = await getFile(template.metadata)
   const interpretations = await api.templateInterpretations(template.id)
   const defaultInterpretation = find(
      (interpretation) => interpretation.tags.includes('default-view'),
      interpretations
   ) as Interpretation

   let imageSource = defaultInterpretation.interpretation.src

   if (imageSource && !imageSource.startsWith('http') && !imageSource.startsWith('/')) {
      imageSource = await getFile(imageSource)
   }

   return {
      ...template,
      description: metadata.description,
      img: imageSource || '',
   }
}

export const fetchTemplateInterpretationsMetadata = async (
   id: string
): Promise<InterpretationWithMetadata[]> => {
   const interpretations = await api.templateInterpretations(id)

   return Promise.all(
      map(async (interpretation) => {
         const metadata = await getFile(interpretation.interpretation.metadata || '')
         const imageSource = interpretation.interpretation.src
         if (imageSource && !imageSource.startsWith('http') && !imageSource.startsWith('/')) {
            metadata.src = interpretation.interpretation.src
            interpretation.interpretation.src = await getFile(imageSource)
         }

         return { ...interpretation, metadata } as InterpretationWithMetadata
      }, interpretations)
   )
}

export const fetchTemplate = async (id: string): Promise<TemplateWithMetadata> => {
   const template = await api.template(id)
   return await fetchTemplateMetadata(template)
}

export const fetchTemplates = async (): Promise<TemplateWithMetadata[]> => {
   const templates = await api.templates()
   const templatesWithMetadata = []

   for (const template of templates) {
      const templateWithMetadata = await fetchTemplateMetadata(template)
      templatesWithMetadata.push(templateWithMetadata)
   }

   return templatesWithMetadata
}
