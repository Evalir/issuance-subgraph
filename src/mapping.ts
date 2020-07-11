import { BigInt } from "@graphprotocol/graph-ts"
import { AddPolicy, ExecuteIssuance, RemovePolicy } from "../generated/Issuance/Issuance"
import { IssuancePolicy } from "../generated/schema"

export function handleAddPolicy(event: AddPolicy): void {
  let entity = IssuancePolicy.load(event.params.policyId.toString())
  if (entity) {
    return
  }
  entity = new IssuancePolicy(event.params.policyId.toString())
  entity.beneficiary = event.params.beneficiary
  entity.blockInflationRate = event.params.blockInflationRate
  entity.active = true
  entity.save()
}

export function handleRemovePolicy(event: RemovePolicy): void {
  let entity = IssuancePolicy.load(event.params.policyId.toString())
  if (!entity) {
    return
  }
  entity.active = false
  entity.save()
}

