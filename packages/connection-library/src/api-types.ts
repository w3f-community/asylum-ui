export const apiTypes = {
   BoundedInterpretationId: 'BoundedVec<u8, u32>',
   BoundedString: 'BoundedVec<u8, u32>',
   BoundedTag: 'BoundedVec<u8, u32>',
   IntepretationInfo: {
      id: 'BoundedInterpretationId',
      src: 'Option<BoundedString>',
      metadata: 'Option<BoundedString>',
   },
   Add: {
      interpretations: 'Vec<(IntepretationInfo, BTreeSet<BoundedTag>)>',
   },
   Modify: {
      interpretations: 'Vec<IntepretationInfo>',
   },
   ModifyTags: {
      interpretationId: 'BoundedInterpretationId',
      tags: 'BTreeSet<BoundedTag>',
   },
   RemoveInterpretation: {
      interpretationId: 'BoundedInterpretationId',
   },
   Change: {
      _enum: {
         Add: 'Add',
         Modify: 'Modify',
         ModifyTags: 'ModifyTags',
         RemoveInterpretation: 'RemoveInterpretation',
      },
   },
}
